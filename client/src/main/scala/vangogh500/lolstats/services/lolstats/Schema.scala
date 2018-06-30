package vangogh500.lolstats.services.lolstats

/**
 * Schemas for app data server api
 */
object Schema {
  /**
   * Summoner profile
   * @param id Summoner id
   * @param accountId Summoner account id
   * @param name Summoner name
   * @param profileIconId Profile icon id as specified in riot api
   * @param level Summoner level
   * @param seasonQueues Tuples of season id and queue id that the summoner has participated in
   */
  case class SummonerProfile(
    id: String,
    accountId: String,
    name: String,
    profileIconId: String,
    level: Int,
    seasonQueue: Seq[(String, String)])
  /**
   * Queue type
   * @param id Queue type id
   * @param name Queue type name
   * @param url Queue type url identifier (used for routing)
   * @param icon Queue icon (used for navigation menu)
   */
  case class Queue(id: String, name: String, url: String, icon: String)
  case class SummonerProfilePage(queues: Seq[Queue], normalizedSummonerStats: Option[SummonerProfile])
}
