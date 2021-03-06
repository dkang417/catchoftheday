import React from 'react';
import PropTypes from 'prop-types';

// stateless function component 
// implicit return 
const Header = props => (
    <header className="top">
        <h1>
            Zoey's {" "}
            {/* <span className="ofThe">
                <span className="of">mm</span>
                <span className="the">yum</span>
            </span> */}
            Market
        </h1>
        <h3 className="tagline">
            <span>{props.tagline}</span>
        </h3>
    </header>
);

Header.propTypes = {
    tagline: PropTypes.string.isRequired
};

export default Header;

// class Header extends React.Component {
//     render() {
//         return (
//             <header className="top">
//                 <h1>
//                     Catch
//                 <span classname="ofThe">
//                         <span className="of">of</span>
//                         <span classname="the">the</span>
//                     </span>
//                     Day
//                 </h1>
//                 <h3 className="tagline">
//                     <span>{this.props.tagline}</span>
//                 </h3>
//             </header>
//         );
//     }
// }
