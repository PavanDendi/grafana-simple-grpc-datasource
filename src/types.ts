import { DataQuery, DataSourceJsonData } from '@grafana/data';

export enum QueryType {
  ListDimensionKeys = 'ListDimensionKeys',
  ListDimensionValues = 'ListDimensionValues',
  ListMetrics = 'ListMetrics',
  GetMetricValue = 'GetMetricValue',
  GetMetricHistory = 'GetMetricHistory',
  GetMetricAggregate = 'GetMetricAggregate',
}

export enum AggregateType {
  AVERAGE = 'AVERAGE',
  MAXIMUM = 'MAX',
  MINIMUM = 'MIN',
  COUNT = 'COUNT',
}

export function isMetricQuery(queryType: QueryType): boolean {
  return (
    queryType === QueryType.GetMetricValue ||
    queryType === QueryType.GetMetricHistory ||
    queryType === QueryType.GetMetricAggregate
  );
}

export interface Metric {
  metricName?: string;
  metricId?: string;
}

export interface MyQuery extends DataQuery {
  queryType: QueryType;
  dimensions?: Dimensions;
  metrics?: Metric[];
  aggregateType?: AggregateType;
  displayName?: string;

  /**
   * @deprecated use metrics
   */
  metricName?: string;
  /**
   * @deprecated use metrics
   */
  metricId?: string;
}

export interface NextQuery extends MyQuery {
  /**
   * The next token should never be saved in the JSON model, however some queries
   * will require multiple pages in order to fulfil the requests
   */
  nextToken?: string;
}

export interface Metadata {
  nextToken?: string;
}

export interface Dimension {
  id: string;
  key: string;
  value: string;
}

export type Dimensions = Dimension[];

export const defaultQuery: Partial<MyQuery> = {
  dimensions: [],
};

/**
 * These are options configured for each DataSource instance
 */
export interface MyDataSourceOptions extends DataSourceJsonData {
  endpoint?: string;
  apikey_authentication_enabled: boolean;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface MySecureJsonData {
  apiKey?: string;
}

export interface GetMetricValueQuery extends MyQuery {
  queryType: QueryType.GetMetricValue;
}

export interface GetMetricHistoryQuery extends MyQuery {
  queryType: QueryType.GetMetricHistory;
}

export interface GetMetricAggregateQuery extends MyQuery {
  queryType: QueryType.GetMetricAggregate;
}

export interface ListDimensionsQuery extends MyQuery {
  queryType: QueryType.ListDimensionKeys;
  selected_dimensions: Dimensions;
  filter: string;
}

export interface ListDimensionValuesQuery extends MyQuery {
  queryType: QueryType.ListDimensionValues;
  selected_dimensions: Dimensions;
  dimensionKey: string;
  filter: string;
}

export interface ListMetricsQuery extends MyQuery {
  queryType: QueryType.ListMetrics;
  dimensions: Dimensions;
  filter: string;
}
