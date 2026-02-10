import { Client } from "@elastic/elasticsearch"
import type { estypes } from "@elastic/elasticsearch"

import { logApp } from "@repo/shared-backend/plugins/logger"

export type ElasticsearchType = {
  index: string
  settings?: estypes.IndicesIndexSettings
  mappings?: estypes.MappingTypeMapping
}

export default class ElasticsearchClient {
  private client: Client

  constructor(url: string) {
    this.client = new Client({
      node: url,
    })
  }

  /**
   * Setting Elasticsearch for index
   * @param params - Index settings and properties
   * @returns True if successful
   */
  async settingIndex(params: ElasticsearchType): Promise<boolean> {
    const { index, settings, mappings } = params

    await this.client.indices.create({ index, settings, mappings })
    return true
  }

  /**
   * Creating Elasticsearch index
   * @param params - Index settings and properties
   * @returns True if successful
   */
  async createIndex(params: ElasticsearchType) {
    const isExists = await this.client.indices.exists({ index: params.index })
    if (!isExists) {
      await this.settingIndex(params)
    }
    return true
  }

  /**
   * Creating Elasticsearch indexes
   * @param params - App Elasticsearch
   * @returns True if successful
   */
  async createIndexes(params: { appElastics?: ElasticsearchType[] }): Promise<void> {
    const appElastics = params.appElastics || []
    if (appElastics.length > 0) {
      for (const appElastic of appElastics) {
        logApp(`Creating Elasticsearch index: ${appElastic.index}`)
        this.createIndex(appElastic)
      }
    } else {
      logApp("No Elasticsearch indexes to create")
    }
  }

  /**
   * Resetting Elasticsearch indexes
   * @param params - App Elasticsearch
   * @returns True if successful
   */
  async resetIndexes(params: { appElastics?: ElasticsearchType[] }): Promise<void> {
    const appElastics = params.appElastics || []
    if (appElastics.length > 0) {
      for (const appElastic of appElastics) {
        const response = await this.client.indices.exists({ index: appElastic.index })
        if (response) await this.client.indices.delete({ index: appElastic.index })
      }
    }
    logApp("Elasticsearch indexes reset done!")
  }
}
