import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

// Material-UI component
import { Dialog, FlatButton, TextField, DatePicker }from 'material-ui';
import { SelectField, MenuItem }from 'material-ui';

// Icons

var styles = {
  dialogTitle: {
    fontSize: 20,
    fontFamily: 'Roboto, Microsoft YaHei',
  },
  customContentStyle: {
    width: '100%',
    maxWidth: 'none',
    textAlign: 'center',
    fontSize: 20,
  },
}

/**
 * Inform data/action process progress situation.
 */
class ConfirmDialog extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    defaultInfo: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

  }

  componentWillReceiveProps() {

  }



  // processSubmitData = () => {
  //   const { onSubmit } = this.props;

  //   // Set submit data to callback function
  //   onSubmit({
  //     pluginname: this.refs.pluginName.getValue(),
  //     symbolicname: this.refs.pluginSymblicName.getValue(),
  //     category: this.state.pluginType,
  //     version: this.refs.pluginVersion.getValue(),
  //     date: this.state.date,
  //     inputfile: this.refs.fileUpload.files[0],
  //     description: this.refs.pluginDescription.getValue()
  //   });
  // }

  render() {

    const {
      title,
      open,
      onSubmit,
      onCancel,
      defaultInfo
    } = this.props;

    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={onCancel}
        />,
      <FlatButton
        label="确定"
        primary={true}
        onTouchTap={onSubmit}
        />
    ];

    return (
      <Dialog
        title={title}
        titleStyle={styles.dialogTitle}
        contentStyle={styles.customContentStyle}
        actions={actions}
        modal={true}
        open={open}
        onRequestClose={this.handleClose}
        >

        { defaultInfo.text } 

      </Dialog>
    );
  }
}

export default ConfirmDialog;