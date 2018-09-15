import React, { Component } from 'react';
import { connect } from 'react-redux';
/* eslint no-unused-vars: ["off", { "caughtErrorsIgnorePattern": "^ignore" }] */
import { bindActionCreators } from 'redux';

import { withRouter, Link } from 'react-router-dom';

import { Box, Flex, Card } from 'rebass';

import styled from 'styled-components';
import { color, space, width, disply, height, position,  } from 'styled-system';

import axios from 'axios';

import { fetchMainMenu } from '../services/actions/page';
import * as reducers from '../services/reducers';
// import fetchPages from '../services/api';

//components
import Dropdown from '../components/Dropdown';


const Toolbar = props => (
  <Flex
    px={2}
    color="white"
    bg="black"
    height={1}
    alignItems="center"
    {...props}
  />
);

const NavItem = props => <Box {...props} width={1} my="auto" height={1} />;

const NavLink = styled(Link)`
${space}
${width}
${color}
padding: 20px;
text-decoration: none;
display: inline-block;

`;

NavItem.displayName = 'NavItem';

class Header extends Component {
  state = {
    loading: true,
    pages: { items: [] }
  };

  props = this.props;

  componentWillMount() {}

  componentDidMount() {
    const { getMenu, menu } = this.props;
    getMenu();
  }

  addIcons = menu => {
    const menuWithIcons = menu.map(item => {
      switch (item.meta.slug) {
        case 'blog':
          return {
            ...item,
            icon: 'icon: social'
          };
        case 'about':
          return {
            ...item,
            icon: 'icon: question'
          };
        default:
          return{
            ...item,
            icon: 'icon: bolt'
          }
      }
    });
    return menuWithIcons;
  };

  render() {
    const { pages } = this.state;
    const { items } = pages;
    const { menu, getMenu } = this.props;

    // if (loading) {
    //   getMenu();
    //   this.setState({ loading: false });
    // }
    const iconMenu = this.addIcons(menu);
    console.log('icon menu', iconMenu);
    return (
      <Flex
        px={2}
        color='white'
        bg=''
        alignItems='center'
        width={1}
      >

        <Box  color='white' position='absolute' className="uk-position-top-left uk-hidden@s ">
          <Dropdown className="" list={iconMenu}/>

        </Box>
        <Box mx='auto'/>
        <Box
          position=""
          className="uk-visible@s"
        >

              <NavLink className="" color="whitish" to="/">
                <span uk-icon="icon: home" /> Home
              </NavLink>
            {iconMenu.map(item => (
                <NavLink
                  className=""
                  color="white"
                  key={item.id}
                  to={{
                    pathname: `/${item.meta.slug}`
                  }}
                >
                  <span uk-icon={item.icon} />
                  {item.title}
                </NavLink>
            ))}
        </Box>
        <Box mx='auto'/>
        <Box
          position=""
          className="uk-position-top-right"
        >

              <NavLink
                color="white"
                to="https://github.com/mazurbeam/"
                target="_blank"
              >
                {' '}
                <span uk-icon="icon: github-alt; ratio: 1.5" />{' '}
              </NavLink>

              <NavLink
                color="white"
                to="https://www.linkedin.com/in/walter-mazur-02803453/"
                target="_blank"
              >
                <span uk-icon="icon: linkedin; ratio: 1.5" />
              </NavLink>

        </Box>


          <Card  className="  main-menu uk-nav uk-position-medium  uk-position-center-left@m uk-overlay "

                           p={3}
                  color='white'
                  borderRadius={8}
                  boxShadow='0 2px 16px rgba(0, 0, 0, 0.25)'
          >

          </Card>
      </Flex>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  menu: reducers.refreshMenu(state)
});

const mapDispatchToProps = dispatch => ({
  getMenu: () => dispatch(fetchMainMenu())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
