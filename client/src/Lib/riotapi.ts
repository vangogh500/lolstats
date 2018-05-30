/**
 * @module riotapi Module for getting static content from riot api
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

/**
 * @function getProfileIconURLById
 * @param {string} id profile icon id
 * @return {string} URL to profile icon
 */
export function getProfileIconURLById(id: string) {
  return 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/profileicon/' + id + '.png'
}
