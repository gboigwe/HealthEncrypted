;; PatientRecord Smart Contract

;; Constants
(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_NOT_AUTHORIZED (err u100))
(define-constant ERR_PATIENT_NOT_FOUND (err u101))
(define-constant ERR_INVALID_INPUT (err u102))
(define-constant ERR_ALREADY_EXISTS (err u103))
(define-constant ERR_ACCESS_DENIED (err u104))
(define-constant ERR_LIST_FULL (err u105))
(define-constant MAX_ACCESS_LIST_SIZE u20)

;; Data structures
(define-map patient-records
  {patient-id: (string-utf8 64)}
  {
    record-hash: (buff 32),
    name: (string-utf8 100),
    date-of-birth: uint,
    blood-type: (string-ascii 3),
    last-updated: uint,
    access-list: (list 20 principal),
    is-active: bool
  }
)

(define-map access-requests
  {patient-id: (string-utf8 64), requester: principal}
  {status: (string-ascii 10), requested-at: uint}
)

(define-map healthcare-providers
  {provider-id: principal}
  {name: (string-utf8 100), license-number: (string-ascii 20), is-active: bool}
)

;; Read-only functions
(define-read-only (get-patient-record (patient-id (string-utf8 64)))
  (match (map-get? patient-records {patient-id: patient-id})
    record (ok (merge record {patient-id: patient-id}))
    ERR_PATIENT_NOT_FOUND
  )
)

(define-read-only (get-access-request (patient-id (string-utf8 64)) (requester principal))
  (map-get? access-requests {patient-id: patient-id, requester: requester})
)

(define-read-only (get-healthcare-provider (provider-id principal))
  (map-get? healthcare-providers {provider-id: provider-id})
)

;; Public functions
(define-public (register-patient 
  (patient-id (string-utf8 64)) 
  (name (string-utf8 100))
  (date-of-birth uint)
  (blood-type (string-ascii 3)))
  (let
    (
      (caller tx-sender)
    )
    (asserts! (is-eq caller CONTRACT_OWNER) ERR_NOT_AUTHORIZED)
    (asserts! (is-none (map-get? patient-records {patient-id: patient-id})) ERR_ALREADY_EXISTS)
    (ok (map-set patient-records
      {patient-id: patient-id}
      {
        record-hash: 0x,
        name: name,
        date-of-birth: date-of-birth,
        blood-type: blood-type,
        last-updated: block-height,
        access-list: (list caller),
        is-active: true
      }
    ))
  )
)

(define-public (update-patient-record 
  (patient-id (string-utf8 64)) 
  (new-record-hash (buff 32)))
  (let
    (
      (caller tx-sender)
      (current-record (unwrap! (map-get? patient-records {patient-id: patient-id}) ERR_PATIENT_NOT_FOUND))
    )
    (asserts! (is-authorized caller patient-id) ERR_NOT_AUTHORIZED)
    (ok (map-set patient-records
      {patient-id: patient-id}
      (merge current-record { 
        record-hash: new-record-hash,
        last-updated: block-height
      })
    ))
  )
)

(define-public (request-access (patient-id (string-utf8 64)))
  (let
    (
      (caller tx-sender)
      (current-time block-height)
    )
    (asserts! (is-some (get-healthcare-provider caller)) ERR_NOT_AUTHORIZED)
    (ok (map-set access-requests
      {patient-id: patient-id, requester: caller}
      {status: "pending", requested-at: current-time}
    ))
  )
)

(define-public (grant-access (patient-id (string-utf8 64)) (provider principal))
  (let
    (
      (caller tx-sender)
      (current-record (unwrap! (map-get? patient-records {patient-id: patient-id}) ERR_PATIENT_NOT_FOUND))
      (current-access-list (get access-list current-record))
    )
    (asserts! (or (is-eq caller CONTRACT_OWNER) (is-owner caller patient-id)) ERR_NOT_AUTHORIZED)
    (asserts! (is-some (get-healthcare-provider provider)) ERR_INVALID_INPUT)
    (asserts! (< (len current-access-list) MAX_ACCESS_LIST_SIZE) ERR_LIST_FULL)
    (map-set access-requests {patient-id: patient-id, requester: provider} {status: "approved", requested-at: (get requested-at (unwrap! (get-access-request patient-id provider) ERR_INVALID_INPUT))})
    (ok (map-set patient-records
      {patient-id: patient-id}
      (merge current-record { 
        access-list: (append current-access-list provider)
      })
    ))
  )
)

(define-public (revoke-access (patient-id (string-utf8 64)) (provider principal))
  (let
    (
      (caller tx-sender)
      (current-record (unwrap! (map-get? patient-records {patient-id: patient-id}) ERR_PATIENT_NOT_FOUND))
    )
    (asserts! (or (is-eq caller CONTRACT_OWNER) (is-owner caller patient-id)) ERR_NOT_AUTHORIZED)
    (map-set access-requests {patient-id: patient-id, requester: provider} {status: "revoked", requested-at: (get requested-at (unwrap! (get-access-request patient-id provider) ERR_INVALID_INPUT))})
    (ok (map-set patient-records
      {patient-id: patient-id}
      (merge current-record { 
        access-list: (filter remove-principal (get access-list current-record))
      })
    ))
  )
)

(define-public (register-healthcare-provider (name (string-utf8 100)) (license-number (string-ascii 20)))
  (let
    (
      (caller tx-sender)
    )
    (asserts! (is-eq caller CONTRACT_OWNER) ERR_NOT_AUTHORIZED)
    (ok (map-set healthcare-providers
      {provider-id: caller}
      {name: name, license-number: license-number, is-active: true}
    ))
  )
)

;; Private functions
(define-private (is-authorized (caller principal) (patient-id (string-utf8 64)))
  (let
    (
      (record (unwrap! (map-get? patient-records {patient-id: patient-id}) false))
    )
    (or 
      (is-eq caller CONTRACT_OWNER)
      (is-owner caller patient-id)
      (is-some (index-of (get access-list record) caller))
    )
  )
)

(define-private (is-owner (caller principal) (patient-id (string-utf8 64)))
  (let
    (
      (record (unwrap! (map-get? patient-records {patient-id: patient-id}) false))
    )
    (is-eq caller (element-at (get access-list record) u0))
  )
)

(define-private (remove-principal (value principal))
  (not (is-eq value tx-sender))
)
