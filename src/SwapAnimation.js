import classNames from 'classnames';
import DelegateTransitionGroup from 'react-delegate-transition-group';
import PropTypes from 'prop-types';
import { Component, createElement } from 'react';
import { findDOMNode } from 'react-dom';

const TICK = 17;

class SwapAnimation extends Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
        component: PropTypes.string,
        animationName: PropTypes.string,
        animationEnterTimeout: PropTypes.number.isRequired,
        animationLeaveTimeout: PropTypes.number.isRequired
    };

    static defaultProps = {
        component: 'div',
        animationName: 'swap-animation'
    };

    childWillEnter = (component, done) => {
        const { animationName, animationEnterTimeout } = this.props;
        const container = findDOMNode(this);
        const node = findDOMNode(component);
        const { offsetHeight } = node;

        node.classList.add(`${animationName}-enter`);
        
        setTimeout(() => {
            container.classList.add(`${animationName}-active`);
            container.style.height = `${offsetHeight}px`; // Animate height
            node.classList.add(`${animationName}-enter-active`);

            setTimeout(() => {
                container.classList.remove(`${animationName}-active`);
                node.classList.remove(`${animationName}-enter`, `${animationName}-enter-active`);
                done();
            }, animationEnterTimeout);
        }, TICK);
    }

    childWillLeave = (component, done) => {
        const { animationName, animationLeaveTimeout } = this.props;
        const container = findDOMNode(this);
        const node = findDOMNode(component);
        const { offsetHeight } = node;

        container.style.height = `${offsetHeight}px`; // Fix height so container can animate
        node.classList.add(`${animationName}-leave`);

        setTimeout(() => {
            node.classList.add(`${animationName}-leave-active`);

            setTimeout(() => {
                container.style.height = null; // Set height back to auto so we don't have to listen to resize events
                node.classList.remove(`${animationName}-leave`, `${animationName}-leave-active`);
                done();
            }, animationLeaveTimeout);
        }, TICK);
    }

    render() {
        const { className, animationName, animationEnterTimeout, animationLeaveTimeout, ...rest } = this.props;

        return createElement(DelegateTransitionGroup, { ...rest, className: classNames(className, animationName), onEnter: this.childWillEnter, onLeave: this.childWillLeave });
    }
}

export default SwapAnimation;
