import type { Identifier, IsoDateTime } from '@tollvord/domain'

export interface LandedCostEngineBoundary {
  readonly module: 'landed_cost'
  readonly status: 'planned'
  readonly plannedFor: 'lota_4'
  readonly definedAt: IsoDateTime
  readonly owner: Identifier
}

export const landedCostEngineBoundary: LandedCostEngineBoundary = {
  module: 'landed_cost',
  status: 'planned',
  plannedFor: 'lota_4',
  definedAt: '2026-04-24T00:00:00.000Z',
  owner: 'tollvord-core'
}
