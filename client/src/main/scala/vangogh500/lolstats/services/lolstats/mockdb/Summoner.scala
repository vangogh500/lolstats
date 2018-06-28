package vangogh500.lolstats.services.lolstats
package mockdb

import types.Summoner._

object Summoner {
  val normalizedStats = Seq(
    NormalizedStats("37738212", "1", Profile("Vangogh", "23", 78), Seq(
      ("1", "1"),
      ("1", "2")
    )),
    NormalizedStats("31077087", "2", Profile("Haimi", "3225", 58), Seq(
      ("1", "1"),
      ("1", "3"),
      ("2", "2"),
      ("2", "3"),
      ("3", "3")
    ))
  )
}
