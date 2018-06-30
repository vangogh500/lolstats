package vangogh500.lolstats.services.lolstats

import Schema._

/**
 * Mock DB
 */
object MockDB {
  /**
   * Collection of summoner profiles
   */
  val summonerProfile = Seq(
    SummonerProfile("37738212", "1", "Vangogh", "23", 78, Seq(
      ("1", "1"),
      ("1", "2")
    )),
    SummonerProfile("31077087", "2", "Haimi", "3225", 58, Seq(
      ("1", "1"),
      ("1", "3"),
      ("2", "2"),
      ("2", "3"),
      ("3", "3")
    )))
  /**
   * Collection of queue types
   */
  val queues = Seq(
    Queue("1", "Solo", "solo", "person"),
    Queue("2", "Flex", "flex", "people"),
    Queue("3", "TT", "tt", "nature"))
}
