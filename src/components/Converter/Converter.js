import './Converter.css';
import React, { Component, Fragment } from 'react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

class Converter extends Component {
  state = {};

  fileHandler = event => {
    const fileObj = event.target.files[0];
    const { type } = fileObj;
    const validFileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    if (type === validFileType) {
      ExcelRenderer(fileObj, (err, resp) => {
        const { cols, rows } = resp;
        if (err) {
          this.setState({
            renderFailed: true
          });
        } else {
          this.setState({
            cols,
            rows,
            renderTable: true,
            renderFailed: false,
            wrongFileFormat: false
          });
        }
      });
    } else {
      this.setState({
        wrongFileFormat: true
      });
    }
  };

  render() {
    const {
      cols,
      rows,
      renderTable,
      renderFailed,
      wrongFileFormat
    } = this.state;
    return (
      <Fragment>
        <button className='btn'> Wybierz Plik </button>
        <input type='file' name='file' onChange={this.fileHandler} />
        {wrongFileFormat && (
          <p className='paragraph-error'> Proszę wybrać plik typu: "xlsx". </p>
        )}
        {renderFailed && (
          <p className='paragraph-error'> Przykro nam, wystąpił błąd. </p>
        )}
        {renderTable && (
          <OutTable
            data={rows}
            columns={cols}
            tableClassName='excelTable'
            tableHeaderRowClass='heading'
          />
        )}
      </Fragment>
    );
  }
}

export default Converter;
