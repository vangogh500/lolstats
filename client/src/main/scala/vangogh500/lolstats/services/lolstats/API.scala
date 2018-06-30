package vangogh500.lolstats.services.lolstats

import scala.concurrent.ExecutionContext.Implicits.global
import Schema._

/**
 * API for grabbing data from data server
 */
object API {
  /**
   * Summoner profile data by summoner name
   * @param summonerName Summoner name
   * @return Summoner profile
   */
  def summonerProfile(summonerName: String) = MockDB.summonerProfile.find {
    case SummonerProfile(_, _, name, _, _, _) => name == summonerName
  }
  
  /**
   * Queues
   */
  def queues = MockDB.queues

  /**
   * Summoner profile page data by summoner name
   * @param summonerName Summoner name
   * @return Summoner profile page data
   */
  def summonerProfilePage(summonerName: String) = for {
    delayed <- Util.delay(3000)
  } yield {
    SummonerProfilePage(queues, summonerProfile(summonerName))
  }
}
