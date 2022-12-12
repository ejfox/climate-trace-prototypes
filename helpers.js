import { format } from 'd3'

export function emissionsNumberFormat(emissionsNumber) {
return format(',.8r')(emissionsNumber)
  }