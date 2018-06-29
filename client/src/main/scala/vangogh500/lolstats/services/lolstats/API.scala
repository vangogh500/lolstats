package vangogh500.lolstats.services.lolstats

import scala.concurrent.ExecutionContext.Implicits.global
import Types._

object API {
  def normalizedSummonerStats(summonerName: String) = MockDB.normalizedSummonerStats.find {
    case NormalizedSummonerStats(_, _, name, _, _, _) => name == summonerName
  }
  def queues = MockDB.queues
  def summonerProfile(summonerName: String) = for {
    delayed <- Util.delay(3000)
  } yield {
    SummonerProfile(queues, normalizedSummonerStats(summonerName))
  }
}
