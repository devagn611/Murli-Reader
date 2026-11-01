import React, { type CSSProperties, PureComponent, type ReactNode } from 'react'
import { type SwipeableProps, useSwipeable } from 'react-swipeable'
import { EpubView, type IEpubViewStyle, type IEpubViewProps } from '..'
import {
  ReactReaderStyle as defaultStyles,
  type IReactReaderStyle,
} from './style'
import { type NavItem } from 'epubjs'
import { Button, IconButton } from '@radix-ui/themes'
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'

type SwipeWrapperProps = {
  children: ReactNode
  swipeProps: Partial<SwipeableProps>
}

const SwipeWrapper = ({ children, swipeProps }: SwipeWrapperProps) => {
  const handlers = useSwipeable(swipeProps)
  return <div {...handlers}>{children}</div>
}

type TocItemProps = {
  data: NavItem
  setLocation: (_value: string) => void
  styles?: CSSProperties
}

const TocItem = ({ data, setLocation, styles }: TocItemProps) => (
  <div>
    <Button variant="ghost" onClick={() => setLocation(data.href)} style={styles}>
      {data.label}
    </Button>
    {data.subitems && data.subitems.length > 0 && (
      <div style={{ paddingLeft: 10 }}>
        {data.subitems.map((item, i) => (
          <TocItem
            key={i}
            data={item}
            styles={styles}
            setLocation={setLocation}
          />
        ))}
      </div>
    )}
  </div>
)

export type IReactReaderProps = IEpubViewProps & {
  title?: string
  showToc?: boolean
  showTocToggle?: boolean
  showArrows?: boolean
  readerStyles?: IReactReaderStyle
  epubViewStyles?: IEpubViewStyle
  swipeable?: boolean
  onTocOpenChange?: (open: boolean) => void
}

type IReactReaderState = {
  isLoaded: boolean
  expandedToc: boolean
  toc: NavItem[]
}

export class ReactReader extends PureComponent<
  IReactReaderProps,
  IReactReaderState
> {
  state: Readonly<IReactReaderState> = {
    isLoaded: false,
    expandedToc: false,
    toc: [],
  }
  readerRef = React.createRef<EpubView>()
  constructor(props: IReactReaderProps) {
    super(props)
  }
  toggleToc = () => {
    this.setState(
      (state) => ({
        expandedToc: !state.expandedToc,
      }),
      () => this.props.onTocOpenChange?.(this.state.expandedToc)
    )
  }

  next = () => {
    const node = this.readerRef.current
    if (node && node.nextPage) {
      node.nextPage()
    }
  }

  prev = () => {
    const node = this.readerRef.current
    if (node && node.prevPage) {
      node.prevPage()
    }
  }

  onTocChange = (toc: NavItem[]) => {
    const { tocChanged } = this.props
    this.setState(
      {
        toc: toc,
      },
      () => tocChanged && tocChanged(toc)
    )
  }

  renderToc() {
    const { toc, expandedToc } = this.state
    const { readerStyles = defaultStyles } = this.props
    return (
      <>
        {expandedToc && (
          <button
            type="button"
            className="toc-backdrop"
            aria-label="Close table of contents"
            onClick={this.toggleToc}
          />
        )}
        <nav
          className={`toc-drawer glass-panel${expandedToc ? ' open' : ''}`}
          aria-label="Table of contents"
          aria-hidden={!expandedToc}
        >
          <div style={readerStyles.toc}>
            {toc.map((item, i) => (
              <TocItem
                data={item}
                key={i}
                setLocation={this.setLocation}
                styles={readerStyles.tocAreaButton}
              />
            ))}
          </div>
        </nav>
      </>
    )
  }

  setLocation = (loc: string) => {
    const { locationChanged, onTocOpenChange } = this.props
    this.setState(
      {
        expandedToc: false,
      },
      () => {
        onTocOpenChange?.(false)
        locationChanged && locationChanged(loc)
      }
    )
  }

  renderTocToggle() {
    const { expandedToc } = this.state
    return (
      <IconButton
        variant="ghost"
        aria-label={expandedToc ? 'Close table of contents' : 'Open table of contents'}
        aria-expanded={expandedToc}
        className="glass-pill"
        style={{ position: 'absolute', top: 16, left: 10, zIndex: 20 }}
        onClick={this.toggleToc}
      >
        {expandedToc ? <X /> : <Menu />}
      </IconButton>
    )
  }

  render() {
    const {
      title,
      showToc = true,
      showTocToggle = true,
      showArrows = true,
      loadingView,
      readerStyles = defaultStyles,
      locationChanged,
      swipeable,
      epubViewStyles,
      ...props
    } = this.props
    const { toc, expandedToc } = this.state
    return (
      <div style={readerStyles.container} className="react-reader">
        <div style={readerStyles.readerArea}>
          {showToc && showTocToggle && this.renderTocToggle()}
          {title ? <div style={readerStyles.titleArea}>{title}</div> : null}
          <SwipeWrapper
            swipeProps={{
              onSwipedRight: this.prev,
              onSwipedLeft: this.next,
              trackMouse: false,
            }}
          >
            <div style={readerStyles.reader}>
              <EpubView
                ref={this.readerRef}
                loadingView={
                  loadingView === undefined ? (
                    <div style={readerStyles.loadingView}>Loading…</div>
                  ) : (
                    loadingView
                  )
                }
                epubViewStyles={epubViewStyles}
                {...props}
                tocChanged={this.onTocChange}
                locationChanged={locationChanged}
              />
              {swipeable && <div style={readerStyles.swipeWrapper} />}
            </div>
          </SwipeWrapper>
          {showArrows && (
            <>
              <IconButton
                size="4"
                variant="ghost"
                color="gray"
                aria-label="Previous page"
                style={Object.assign({}, readerStyles.arrow, readerStyles.prev)}
                onClick={this.prev}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                size="4"
                variant="ghost"
                color="gray"
                aria-label="Next page"
                style={Object.assign({}, readerStyles.arrow, readerStyles.next)}
                onClick={this.next}
              >
                <ChevronRight />
              </IconButton>
            </>
          )}
        </div>
        {showToc && toc && expandedToc && this.renderToc()}
      </div>
    )
  }
}
