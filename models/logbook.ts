import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const logbookSchema = new Schema({
  User: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  call: { type: String, required: true },
  qso_date: { type: String, required: true },
  time_on: { type: String, required: true },
  band: { type: String, required: true },
  mode: { type: String, required: true },
  rst_sent: { type: String, required: true },
  rst_rcvd: { type: String, required: true },
  freq: { type: Number },
  freq_rx: { type: Number },
  qsl_rcvd: { type: String, enum: ['Y', 'N', 'R'], default: 'N' },
  qsl_sent: { type: String, enum: ['Y', 'N', 'R'], default: 'N' },
  station_callsign: { type: String },
  my_gridsquare: { type: String },
  gridsquare: { type: String },
  tx_pwr: { type: String },
  operator: { type: String },
  my_sig: { type: String },
  my_sig_info: { type: String },
  sig: { type: String },
  sig_info: { type: String },
  qsl_via: { type: String },
  contest_id: { type: String },
  ituz: { type: Number },
  cqz: { type: Number },
  dxcc: { type: Number },
  country: { type: String },
  eqsl_qsl_rcvd: { type: String, enum: ['Y', 'N', 'R'] },
  eqsl_qsl_sent: { type: String, enum: ['Y', 'N', 'R'] },
  lotw_qsl_rcvd: { type: String, enum: ['Y', 'N', 'R'] },
  lotw_qsl_sent: { type: String, enum: ['Y', 'N', 'R'] },
  comment: { type: String },
  qsl_rcvd_date: { type: String },
  qsl_sent_date: { type: String },
  time_off: { type: String },
  prop_mode: { type: String },
  sat_name: { type: String },
  sat_mode: { type: String },
  rx_pwr: { type: String },
  ant_az: { type: Number },
  ant_el: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('LogbookEntry', logbookSchema);
