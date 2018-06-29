package vangogh500.lolstats.services.lolstats

import scala.concurrent.{Future, Promise}
import scala.scalajs.js.timers._

object Util {
  def delay(milliseconds: Int): Future[Unit] = {
    val p = Promise[Unit]()
    setTimeout(milliseconds) {
      p.success(())
    }
    p.future
  }
}
