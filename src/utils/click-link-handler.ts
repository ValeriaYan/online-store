function clickLinkHandler(event: Event): void {
  event.preventDefault();
  if (event.target instanceof HTMLAnchorElement) {
    history.pushState({}, '', event.target.href);
    const popStateEvent = new PopStateEvent('popstate', {});
    dispatchEvent(popStateEvent);
  }
}

export default clickLinkHandler;
