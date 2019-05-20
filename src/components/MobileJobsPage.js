import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';
import {
  MobileJobsList,
  CustomLoader,
  GridContainer,
  NoResultsBox,
  PageHeader,
  ResultStats
} from './index';
import theme from '../styles/theme';
import numberOfUniqueSources from '../utils/numberOfUniqueSources';
import PageHeaderAds from './PageHeaderAds';

class MobileJobsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeComponent: 'list',
      headerHeight: '',
      headerVisible: true,
      lastScrollTop: 0
    };
    this.headerRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ headerHeight: this.headerRef.current.clientHeight });
  }

  componentDidUpdate() {
    if (this.headerRef.current.clientHeight !== this.state.headerHeight) {
      this.setState({
        headerHeight: this.headerRef.current.clientHeight
      });
    }
  }

  handleScroll = ref => {
    const { headerHeight } = this.state;

    const refScrollTop = ref.current.scrollTop;
    // const headerHeight = this.headerRef.current.offsetHeight
    // console.log(headerHeight)

    const { lastScrollTop } = this.state;

    if (Math.abs(this.state.lastScrollTop - refScrollTop) <= 5) {
      return;
    }

    if (refScrollTop > lastScrollTop && refScrollTop > headerHeight) {
      this.setState({
        headerVisible: false,
        lastScrollTop: refScrollTop
      });
    } else {
      this.setState({
        headerVisible: true,
        lastScrollTop: refScrollTop
      });
    }
  };

  getContent = () => {
    const { activeComponent, headerHeight } = this.state;
    const { hits, isFetching, error } = this.props;

    if (isFetching) {
      return <CustomLoader size="massive" content="Laddar" />;
    } else if (error) {
      return <NoResultsBox />;
    } else if (Object.keys(hits).length === 0) {
      return <NoResultsBox />;
    } else {
      return (
        <>
          <div
            style={{
              display: activeComponent === 'list' ? 'block' : 'none',
              height: '100%',
              marginTop: `-${headerHeight}px`
            }}
          >
            <MobileJobsList handleScroll={this.handleScroll} />
          </div>
          {activeComponent === 'map' && <div>KARTA</div>}
        </>
      );
    }
  };

  render() {
    const { hits } = this.props;
    const { activeComponent, headerHeight, headerVisible } = this.state;

    return (
      <GridContainer rows={`${headerHeight}px calc(100vh - ${headerHeight}px)`}>
        <Header
          ref={this.headerRef}
          className={headerVisible ? 'visible' : 'hidden'}
        >
          <PageHeader mobile ads />

          {hits.length > 0 && <ResultStats />}

          <CustomMenu borderless fluid widths={2}>
            <CustomMenuItem
              name="list"
              active={activeComponent === 'list'}
              content="Annonser"
              onClick={() => this.setState({ activeComponent: 'list' })}
            />

            <CustomMenuItem
              name="map"
              active={activeComponent === 'map'}
              content="Karta"
              onClick={() => this.setState({ activeComponent: 'map' })}
            />
          </CustomMenu>
        </Header>
        <div style={{ marginTop: `${headerHeight}px` }}>
          {this.getContent()}
        </div>
      </GridContainer>
    );
  }
}

function mapStateToProps({ ads }) {
  const { hits, error, isFetching } = ads;

  return {
    hits,
    error,
    isFetching
  };
}

export default connect(
  mapStateToProps,
  null
)(MobileJobsPage);

const CustomMenu = styled(Menu)`
  &&& {
    border: none;
    box-shadow: none;
    margin: 0;

    & > * {
      background: ${theme.green0};
      border-top: 2px solid ${theme.green4};
      border-bottom: 2px solid ${theme.green4};
      border-left: 1px solid ${theme.green4};
      border-right: 1px solid ${theme.green4};
      border-radius: 0;
      box-shadow: none;
    }

    & > :first-child {
      border-left: none;
      border-radius: 0;
    }

    & > :last-child {
      border-right: none;
      border-radius: 0;
    }
  }
`;

const CustomMenuItem = styled(Menu.Item)`
  &&& {
    font-size: ${props => props.theme.fontSizeMedium};
    color: ${props => props.theme.grey};
    border-radius: 0;

    &::before {
      background: none;
    }

    &.active {
      background: none;
      border-bottom: none;
    }

    &&&:active,
    &&&:hover {
      background: none;
    }
  }
`;

const Header = styled.header`
  grid-row: 1/2;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
  transition: all 0.3s;

  &.visible {
    transform: translateY(0px);
  }

  &.hidden {
    transform: translateY(-269px);
  }
`;
