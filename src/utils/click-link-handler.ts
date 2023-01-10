function clickLinkHandler(event: Event): void {
  event.preventDefault();
  if (event.currentTarget instanceof HTMLAnchorElement) {
    history.pushState({}, '', event.currentTarget.href);
    const popStateEvent = new PopStateEvent('popstate', {});
    dispatchEvent(popStateEvent);
  }
}

export default clickLinkHandler;
