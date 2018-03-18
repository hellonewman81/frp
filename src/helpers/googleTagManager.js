import React from 'react';
import PropTypes from 'prop-types';
import gtmParts from 'react-google-tag-manager';

class GoogleTagManager extends React.Component {
  componentDidMount() {

  }

  render() {
    const gtm = gtmParts({
      id: this.props.gtmId,
      dataLayerName: this.props.dataLayerName || 'dataLayer',
      additionalEvents: this.props.additionalEvents || {},
      previewVariables: this.props.previewVariables || false
    });
    return (
      <div>
        <script
          dangerouslySetInnerHTML={{ __html: 'dataLayer=[{"page":"catalog-category-view"}];' }}
        />
        <div>{gtm.noScriptAsReact()}</div>
        <div id={this.props.scriptId || 'react-google-tag-manager-gtm'}>{gtm.scriptAsReact()}</div>
      </div>
    );
  }
}

GoogleTagManager.propTypes = {
  gtmId: PropTypes.string.isRequired,
  dataLayerName: PropTypes.string,
  additionalEvents: PropTypes.objectOf(PropTypes.any),
  previewVariables: PropTypes.string,
  scriptId: PropTypes.string
};

GoogleTagManager.defaultProps = {
  dataLayerName: 'dataLayer',
  additionalEvents: null,
  previewVariables: null,
  scriptId: null
};

export default GoogleTagManager;
