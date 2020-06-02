import React, { useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { ListView, Tabs } from 'antd-mobile'
import {
  AppWrap,
  BannerWrap,
  AppTabs,
  ShareFixed,
  HasMore,
  SpinWrap
} from './style'
import ListItem from './components/ListItem'
import bannerImg from '../../assets/imgs/banner.jpg'
import { rem } from '../../utils'
import { actionCreaters } from './store'
import { StickyContainer, Sticky } from 'react-sticky'

const App = (props) => {
  const {
    isApp,
    bottomHeight,
    active,
    tabs,
    row,
    height,
    hasMore,
    dataSource,
    inviteCode,
    getCate,
    handleTabOnChange,
    renderRow,
    handleShare,
    onEndReached
  } = props
  useEffect(() => {
    getCate()
  }, [getCate])
  const renderContent = (tab) => {
    return tabs[active]._id === tab._id ? (
      <ListView
        dataSource={dataSource}
        renderRow={renderRow}
        initialListSize={row}
        pageSize={row}
        style={{
          height: height
        }}
        renderFooter={() => (
          <HasMore>
            {hasMore ? (
              <>
                <SpinWrap>
                  <svg viewBox='25 25 50 50' class='van-loading__circular'>
                    <circle cx='50' cy='50' r='20' fill='none'></circle>
                  </svg>
                </SpinWrap>{' '}
                加载中...
              </>
            ) : (
              ''
            )}
          </HasMore>
        )}
        scrollEventThrottle={20}
        onEndReached={onEndReached}
      ></ListView>
    ) : null
  }

  const renderTabBar = (props) => {
    return (
      <Sticky>
        {({ style }) => (
          <div style={{ ...style, zIndex: 1 }}>
            <Tabs.DefaultTabBar {...props} />
          </div>
        )}
      </Sticky>
    )
  }

  return (
    <AppWrap style={{ paddingBottom: bottomHeight }}>
      <BannerWrap>
        <img src={bannerImg} alt='' />
      </BannerWrap>
      <AppTabs>
        <StickyContainer>
          <Tabs
            tabs={tabs}
            initialPage={active}
            onChange={handleTabOnChange}
            tabBarTextStyle={{
              fontSize: rem(32)
            }}
            renderTabBar={renderTabBar}
            tabBarActiveTextColor='#FF8202'
            tabBarInactiveTextColor='#25282D'
          >
            {renderContent}
          </Tabs>
        </StickyContainer>
      </AppTabs>
      <ShareFixed onClick={() => handleShare(isApp)}>
        <button>{isApp ? '分享给好友' : `邀请码：${inviteCode}`}</button>
      </ShareFixed>
    </AppWrap>
  )
}

const mapState = (state) => {
  return {
    isApp: state.getIn(['base', 'isApp']),
    bottomHeight: state.getIn(['base', 'bottomHeight']),
    tabs: state.getIn(['app', 'tabs']).toJS(),
    active: state.getIn(['app', 'active']),
    list: state.getIn(['app', 'list']),
    row: state.getIn(['app', 'row']),
    inviteCode: state.getIn(['app', 'inviteCode']),
    height: state.getIn(['app', 'height']),
    hasMore: state.getIn(['app', 'hasMore']),
    refreshing: state.getIn(['app', 'refreshing']),
    isLoading: state.getIn(['app', 'isLoading']),
    dataSource: state.getIn(['app', 'dataSource'])
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCate() {
      dispatch(actionCreaters.getCate())
    },
    handleTabOnChange(item, index) {
      dispatch(actionCreaters.activeChange(index))
      dispatch(actionCreaters.setPage(1))
      dispatch(actionCreaters.setHasMore(true))
      dispatch(actionCreaters.getList(item, 1))
    },
    renderRow(data) {
      return <ListItem key={data} data={data} />
    },
    handleShare(isApp) {
      if (isApp) {
        dispatch(actionCreaters.shareInApp())
      } else {
        window.location.href = 'https://www.xinletao.vip/starDown.html'
      }
    },
    onEndReached() {}
  }
}

export default connect(mapState, mapDispatch)(memo(App))
