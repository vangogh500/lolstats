package vangogh500.lolstats.services.lolstats.types

object Summoner {
  case class Profile(name: String, profileIconId: String, level: Int)
  case class NormalizedStats(id: String, accountId: String, profile: Profile, seasonQueueTuples: Seq[(String, String)])
}
