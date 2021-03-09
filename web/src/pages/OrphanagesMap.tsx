import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";



import 'leaflet/dist/leaflet.css';
import '../styles/pages/orphanagesMap.css';

import mapMarkerImg from '../images/map-marker.svg';


function OrphanagesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>São Paulo</strong>
                    <span>Campinas</span>
                </footer>
            </aside>

            <Map
                center={[-27.2092052, -49.6401092]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}

            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>


        </div>
    )
};


export default OrphanagesMap;