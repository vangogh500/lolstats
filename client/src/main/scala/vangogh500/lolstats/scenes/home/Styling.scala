package vangogh500.lolstats.scenes.home

import scalacss.DevDefaults._

object Styling extends StyleSheet.Inline {
  import dsl._
  val container = style(
    backgroundImage := "url(\"/img/home_bg.png\")"
  )
}
