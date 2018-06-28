package vangogh500.lolstats.services.lolstats
package api


import scala.concurrent.ExecutionContext.Implicits.global
import types.Summoner._
import mockdb.{Summoner => DB}

object Summoner {
  def normalizedStats(summonerName: String) = for {
    delayed <- Util.delay(3000)
  } yield {
    DB.normalizedStats.find {
      case NormalizedStats(_, _, Profile(name, _, _), _) => name == summonerName
    } match {
      case Some(stats) => stats
      case _ => throw new Exception("Not found")
    }
  }
}
