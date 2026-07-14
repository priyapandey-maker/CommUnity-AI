# Database Schema

Version 2.0

---

Users

id

name

email

role

departmentId

createdAt

--------------------------------

Departments

id

name

description

--------------------------------

Incidents

id

title

description

category

severity

priority

status

locationId

userId

decisionId

createdAt

--------------------------------

Locations

id

latitude

longitude

ward

zone

address

--------------------------------

IncidentImages

id

incidentId

url

--------------------------------

AIAnalysis

id

incidentId

summary

category

confidence

riskScore

priority

reasoning

--------------------------------

Recommendations

id

incidentId

department

action

estimatedTime

--------------------------------

Feedback

id

incidentId

citizenRating

officerRating

comments

--------------------------------

Notifications

id

userId

title

message

read

--------------------------------

AuditLogs

id

action

userId

timestamp

metadata
