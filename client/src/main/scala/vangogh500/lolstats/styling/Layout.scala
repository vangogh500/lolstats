package vangogh500.lolstats.styling

import scalacss.DevDefaults._

/**
 * layout styling
 */
object Layout extends StyleSheet.Inline {
  import dsl._

  /**
   * Background center styling
   */
  val bgCenter = style(
    backgroundPosition := "center"
  )
  /**
   * Background size cover styling
   */
  val bgCover = style(
    backgroundSize := "cover"
  )
}
