export default class Security {
  private readonly withelist: number[];

  constructor(...chatID: number[]) {
    this.withelist = [...chatID];
  }

  getWhitelist(): number[] {
    return this.withelist;
  }

  isChatInTheWhitelist(chatId: number): boolean {
    let isInWhitelist = true;

    for (const chat of this.withelist) {
      if (chatId !== chat) isInWhitelist = false;
      else isInWhitelist = true;
    }

    return isInWhitelist;
  }
}
