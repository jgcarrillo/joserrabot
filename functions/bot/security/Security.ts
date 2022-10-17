export default class Security {
  private readonly withelist: number[];

  /**
   *
   * @param chatID - The valid chat ID
   */
  constructor(...chatID: number[]) {
    this.withelist = [...chatID];
  }

  /**
   * This function return the list of chat IDs that are valid to the bot
   * @returns {number} - The list of chat IDs
   */
  getWhitelist(): number[] {
    return this.withelist;
  }

  /**
   * This function return a boolean wheter the chat ID is in the list or not
   * @param chatId - The chat ID that needs to be checked
   * @returns {boolean} - The authorization for the chat ID
   */
  isChatInTheWhitelist(chatId: number): boolean {
    let isInWhitelist = true;

    for (const chat of this.withelist) {
      if (chatId !== chat) isInWhitelist = false;
      else isInWhitelist = true;
    }

    return isInWhitelist;
  }
}
