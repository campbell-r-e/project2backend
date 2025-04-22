import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const logbookSchema = new Schema({
  User: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Required / Common fields
  call: { type: String, required: true }, // Station worked
  qso_date: { type: String, required: true }, // YYYYMMDD
  time_on: { type: String, required: true }, // HHMM or HHMMSS
  band: { type: String, required: true },
  mode: { type: String, required: true },
  rst_sent: { type: String, required: true },
  rst_rcvd: { type: String, required: true },
  freq: { type: Number }, // Optional if band is used
  freq_rx: { type: Number }, // Optional (if split)
  qsl_rcvd: { type: String, enum: ['Y', 'N', 'R'], default: 'N' },
  qsl_sent: { type: String, enum: ['Y', 'N', 'R'], default: 'N' },

  // Optional ADIF fields
  station_callsign: { type: String }, // Your station call
  my_gridsquare: { type: String }, // Optional
  gridsquare: { type: String }, // DX station grid
  tx_pwr: { type: String }, // Power level used
  operator: { type: String }, // Callsign of operator
  my_sig: { type: String }, // Optional, e.g. "SOTA", "POTA"
  my_sig_info: { type: String },
  sig: { type: String }, // Optional
  sig_info: { type: String },
  qsl_via: { type: String }, // QSL manager
  contest_id: { type: String }, // Optional for contest logging
  ituz: { type: Number }, // ITU zone
  cqz: { type: Number }, // CQ zone
  dxcc: { type: Number }, // DXCC entity code
  country: { type: String }, // Derived from DXCC
  eqsl_qsl_rcvd: { type: String, enum: ['Y', 'N', 'R'] },
  eqsl_qsl_sent: { type: String, enum: ['Y', 'N', 'R'] },
  lotw_qsl_rcvd: { type: String, enum: ['Y', 'N', 'R'] },
  lotw_qsl_sent: { type: String, enum: ['Y', 'N', 'R'] },
  comment: { type: String },
  qsl_rcvd_date: { type: String }, // YYYYMMDD
  qsl_sent_date: { type: String }, // YYYYMMDD
  time_off: { type: String }, // HHMM or HHMMSS
  prop_mode: { type: String }, // E.g. "SAT", "TR"
  sat_name: { type: String },
  sat_mode: { type: String },
  rx_pwr: { type: String }, // Optional
  ant_az: { type: Number },
  ant_el: { type: Number },

  // Timestamps
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('LogbookEntry', logbookSchema);
