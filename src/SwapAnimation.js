import classNames from 'classnames';
import DelegateTransitionGroup from 'react-delegate-transition-group';
import { addEndEventListener, removeEndEventListener } from 'react/lib/ReactTransitionEvents';
import { Component, PropTypes, createElement } from 'react';
import { findDOMNode } from 'react-dom';

const TICK = 17;

class SwapAnimation extends Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
        component: PropTypes.string,
        animationName: PropTypes.string
    };

    static defaultProps = {
        component: 'div',
        animationName: 'swap-animation'
    };

    childWillEnter = (component, done) => {
        const { animationName } = this.props;
        const container = findDOMNode(this);
        const node = findDOMNode(component);
        const { offsetHeight } = node;

        node.classList.add(`${animationName}-enter`);
        
        setTimeout(() => {
            addEndEventListener(node, endListener);
            container.classList.add(`${animationName}-active`);
            container.style.height = `${offsetHeight}px`; // Animate height
            node.classList.add(`${animationName}-enter-active`);

            function endListener(event) {
                if (event.target !== node) return;
                container.classList.remove(`${animationName}-active`);
                node.classList.remove(`${animationName}-enter`, `${animationName}-enter-active`);
                removeEndEventListener(node, endListener);
                done();
            }
        }, TICK);
    }

    childWillLeave = (component, done) => {
        const { animationName } = this.props;
        const container = findDOMNode(this);
        const node = findDOMNode(component);
        const { offsetHeight } = node;

        container.style.height = `${offsetHeight}px`; // Fix height so container can animate
        node.classList.add(`${animationName}-leave`);

        setTimeout(() => {
            addEndEventListener(node, endListener);
            node.classList.add(`${animationName}-leave-active`);

            function endListener(event) {
                if (event.target !== node) return;
                container.style.height = null; // Set height back to auto so we don't have to listen to resize events
                node.classList.remove(`${animationName}-leave`, `${animationName}-leave-active`);
                removeEndEventListener(node, endListener);
                done();
            }
        }, TICK);
    }

    render() {
        const { className, animationName } = this.props;

        return createElement(DelegateTransitionGroup, { ...this.props, className: classNames(className, animationName), onEnter: this.childWillEnter, onLeave: this.childWillLeave });
    }
}

export default SwapAnimation;
