package vangogh500.lolstats.services.riot.api

/**
 * Static api for riot
 */
object Static {
  /**
   * Get profile icon url using profile icon id
   * @param id Profile icon id
   */
  def profileIconUrl(id: String) = "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/profileicon/" + id + ".png"
}
