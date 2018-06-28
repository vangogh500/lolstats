package vangogh500.lolstats.styling

import scalacss.DevDefaults._

object Layout extends StyleSheet.Inline {
  import dsl._

  val bgCenter = style(
    backgroundPosition := "center"
  )
  val bgCover = style(
    backgroundSize := "cover"
  )
}
