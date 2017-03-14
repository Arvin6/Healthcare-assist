import React from 'react'
import ReactDOM from 'react-dom'
import MyRouter from './router'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/fusioncharts/themes/fusioncharts.theme.ocean'
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

ReactDOM.render(
<MyRouter />  ,
  document.getElementById('root')
);
