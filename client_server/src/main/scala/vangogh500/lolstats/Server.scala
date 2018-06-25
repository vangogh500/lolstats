package vangogh500.lolstats

import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import scala.io.StdIn

object WebServer extends App {
  implicit val system = ActorSystem("client_server")
  implicit val materializer = ActorMaterializer()
  implicit val executionContext = system.dispatcher

  val route =
      pathPrefix("js") {
        getFromResourceDirectory("js")
      } ~
      pathPrefix("img") {
        getFromResourceDirectory("img")
      } ~
      getFromResource("index.html")
  val bindingFuture = Http().bindAndHandle(route, "localhost", 8080)
  println(s"Server online at http://localhost:8080/\nPress RETURN to stop...")
  StdIn.readLine()
  bindingFuture.flatMap(_.unbind()).onComplete(_ => system.terminate())
}
