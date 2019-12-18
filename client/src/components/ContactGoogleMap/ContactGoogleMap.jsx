import React from 'react';
import GoogleMapReact from 'google-map-react';
import { withTranslation } from 'react-i18next';

import { mapStyleConfig } from '../../constants/mapStyleConfig';

import './ContactGoogleMap.scss';

export class ContactGoogleMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 51.53449726,
      lng: 46.00635409
    },
    zoom: 15,
    markersCoord: [
      {
        location: { lat: 51.53522137, lng: 46.00988656 },
        label: 'Kovcheg-map-label'
      },
      {
        location: { lat: 51.53409016, lng: 45.99992484 },
        label: 'Samson-map-label'
      }
    ]
  };

  handleApiLoaded = (map, maps) => {
    map.setOptions({ styles: mapStyleConfig });
    const t = this.props.t;
    this.props.markersCoord.forEach((place) => {
      const marker = new maps.Marker({
        map: map,
        position: place.location,
        animation: maps.Animation.DROP
      });

      maps.event.addListener(marker, 'click', function () {
        const infoWindow = new maps.InfoWindow();
        infoWindow.setContent(t(place.label));
        infoWindow.open(map, this);
      });
    });
  };

  render() {
    return <div className="map-wrapper">
      <div className="map-wrapper__header-wrapper">
        <div className="map-wrapper__header-panel">
          <p className="map-wrapper__header">
            {this.props.t('our-office-left')} <span className="map-wrapper__header_colored">{this.props.t('our-office-right')}</span>
          </p>
        </div>

      </div>

      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyD1mpPY_8nO_wQ15dI4nEgDgukSgG82FfE' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
      >
      </GoogleMapReact>
    </div>
  }
}

export default withTranslation()(ContactGoogleMap);