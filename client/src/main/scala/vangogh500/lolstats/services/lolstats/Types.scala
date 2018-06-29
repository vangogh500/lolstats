package vangogh500.lolstats.services.lolstats

object Types {
  case class NormalizedSummonerStats(
    id: String,
    accountId: String,
    name: String,
    profileIconId: String,
    level: Int,
    seasonQueueTuples: Seq[(String, String)])
  case class Queue(id: String, name: String, url: String, icon: String)

  case class SummonerProfile(queues: Seq[Queue], normalizedSummonerStats: Option[NormalizedSummonerStats])
}
