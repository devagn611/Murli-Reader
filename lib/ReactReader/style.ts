import type { CSSProperties } from 'react'

export interface IReactReaderStyle {
  container: CSSProperties
  readerArea: CSSProperties
  containerExpanded: CSSProperties
  titleArea: CSSProperties
  reader: CSSProperties
  swipeWrapper: CSSProperties
  prev: CSSProperties
  next: CSSProperties
  arrow: CSSProperties
  arrowHover: CSSProperties
  tocBackground: CSSProperties
  toc: CSSProperties
  tocArea: CSSProperties
  tocAreaButton: CSSProperties
  tocButton: CSSProperties
  tocButtonExpanded: CSSProperties
  tocButtonBar: CSSProperties
  tocButtonBarTop: CSSProperties
  loadingView: CSSProperties
  tocButtonBottom: CSSProperties
}

export const ReactReaderStyle: IReactReaderStyle = {
  container: {
    overflow: 'hidden',
    position: 'relative',
    height: '100%',
    width: '100%',
    background: 'transparent',
  },
  readerArea: {
    position: 'relative',
    zIndex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    transition: 'background-color .3s ease',
  },
  containerExpanded: {},
  titleArea: {
    display: 'none',
  },
  reader: {
    position: 'absolute',
    inset: 0,
  },
  swipeWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 200,
  },
  prev: {
    left: 1,
  },
  next: {
    right: 1,
  },
  arrow: {
    outline: 'none',
    border: 'none',
    background: 'none',
    position: 'absolute',
    top: '50%',
    marginTop: -32,
    fontSize: 64,
    padding: '0 10px',
    color: 'black',
    fontFamily: 'arial, sans-serif',
    cursor: 'pointer',
    userSelect: 'none',
    appearance: 'none',
    fontWeight: 'normal',
  },
  arrowHover: {
    color: '#777',
  },
  toc: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  tocBackground: {
    position: 'absolute',
    inset: 0,
    zIndex: 35,
    border: 'none',
    background: 'rgba(0,0,0,0.28)',
  },
  tocArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 40,
    width: 'min(320px, 86vw)',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    padding: '18px 10px',
    transform: 'translateX(-105%)',
    transition: 'transform .28s ease',
  },
  tocAreaButton: {
    userSelect: 'none',
    appearance: 'none',
    background: 'none',
    border: 'none',
    display: 'block',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    width: '100%',
    fontSize: '.92em',
    textAlign: 'left',
    padding: '.7em .9em',
    color: 'inherit',
    cursor: 'pointer',
    borderRadius: 12,
  },
  tocButton: {
    background: 'none',
    border: 'none',
    position: 'absolute',
    top: 16,
    left: 10,
    zIndex: 2,
    cursor: 'pointer',
  },
  tocButtonExpanded: {},
  tocButtonBar: {
    position: 'absolute',
    width: '60%',
    background: '#ccc',
    height: 2,
    left: '50%',
    margin: '-1px -30%',
    top: '50%',
    transition: 'all .5s ease',
  },
  tocButtonBarTop: {
    top: '35%',
  },
  tocButtonBottom: {
    top: '66%',
  },
  loadingView: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    right: '10%',
    color: 'inherit',
    textAlign: 'center',
    marginTop: '-.5em',
    opacity: 0.55,
  },
}
