
export function push(url: string) {

    const prevScrollX = window.pageXOffset;
    const prevScrollY = window.pageYOffset;

    window.history.pushState(null, '', url);
    window.dispatchEvent( new Event("popstate") );

    window.scrollTo(prevScrollX, prevScrollY);
}