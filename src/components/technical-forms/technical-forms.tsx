import classNames from 'classnames';
import styles from './technical-forms.module.scss';
import React, { useState, useEffect, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import { Form, Header, Icon, Checkbox } from 'semantic-ui-react';

export interface TechnicalFormsProps {
    className?: string;
}


const faultOptions = [
    { key: '1', text: 'Load Shedding (l/s)', value: 'load_shedding' },
    { key: '2', text: 'Earth Fault (e/f)', value: 'earth_fault' },
    { key: '3', text: 'Over Current (o/c)', value: 'over_current' },
    { key: '4', text: 'Instantaneous Current', value: 'instantaneous_current' },
    { key: '5', text: 'DT Fault (Permit)', value: 'dt_fault_permit' },
    { key: '6', text: 'Installation (Permit)', value: 'intallation_permit' },
    { key: '7', text: 'TCN', value: 'tcn' },
];

const states = [
    { key: 'kano', text: 'Kano', value: 'kano' },
    { key: 'katsina', text: 'Katsina', value: 'katsina' },
    { key: 'jigawa', text: 'Jigawa', value: 'jigawa' },
];

const businessDistricts = {
    kano: [
        { key: 'kano_central', text: 'Kano Central', value: 'kano_central' },
        { key: 'kano_north', text: 'Kano North', value: 'kano_north' },
        { key: 'kano_east', text: 'Kano East', value: 'kano_east' },
        { key: 'kano_industrial', text: 'Kano Industrial', value: 'kano_industrial' },
        { key: 'kano_west', text: 'Kano West', value: 'kano_west' },
    ],
    katsina: [
        { key: 'katsina_central', text: 'Katsina Central', value: 'katsina_central' },
        { key: 'katsina_north', text: 'Katsina North', value: 'katsina_north' },
        { key: 'katsina_south', text: 'Katsina South', value: 'katsina_south' },   
    ],
    jigawa: [
        { key: 'jigawa_north', text: 'Jigawa North', value: 'jigawa_north' },
        { key: 'jigawa_south', text: 'Jigawa South', value: 'jigawa_south' },
    ],
};

const feeders = {
    kano: {
        kano_central: [
            { key: 'kc_11kv_1', text: '11KV Dr Bala', value: 'kano_central_11kv Dr Bala' },
            { key: 'kc_33kv_2', text: '33KV CBN Lineload', value: 'kano_central_33KV CBN Lineload' },
            { key: 'kc_11kv_3', text: '11KV Ahmadu Bello', value: 'kano_central_11KV Ahmadu Bello' },
            { key: 'kc_11kv_4', text: '11KV Bank Road', value: 'kano_central_11KV Bank Road' },
            { key: 'kc_11kv_5', text: '11KV Audu Bako', value: 'kano_central_11KV Audu Bako' },
            { key: 'kc_11kv_6', text: '11KV Badawa', value: 'kano_central_11KV Badawa' },
            { key: 'kc_11kv_7', text: '11KV Race Course', value: 'kano_central_11KV Race Course' },
            { key: 'kc_11kv_8', text: '11KV Noman\'s Land', value: 'kano_central_11KV Noman\'s Land' },
            { key: 'kc_11kv_9', text: '11KV Fanisau', value: 'kano_central_11KV Fanisau' },
            { key: 'kc_33kv_10', text: '33KV Briscoe Lineload', value: 'kano_central_33KV Briscoe Lineload' },
            { key: 'kc_11kv_11', text: '11KV Bompai', value: 'kano_central_11KV Bompai' },
            { key: 'kc_11kv_12', text: '11KV Maimalari', value: 'kano_central_11KV Maimalari' },
            { key: 'kc_11kv_13', text: '11KV Independence', value: 'kano_central_11KV Independence' },
            { key: 'kc_11kv_14', text: '11KV Yusuf', value: 'kano_central_11KV Yusuf' },
            { key: 'kc_11kv_15', text: '11KV Gwagwarwa', value: 'kano_central_11KV Gwagwarwa' },
            { key: 'kc_11kv_16', text: '11KV T/Wada', value: 'kano_central_11KV T/Wada' },
            { key: 'kc_33kv_17', text: '33KV Club F3 (Flour Mills) Lineload', value: 'kano_central_33KV Club F3 (Flour Mills) Lineload' },
            { key: 'kc_11kv_18', text: '11KV Murtala Mohd', value: 'kano_central_11KV Murtala Mohd' },
            { key: 'kc_11kv_19', text: '11KV Lamido', value: 'kano_central_11KV Lamido' },
            { key: 'kc_33kv_20', text: '33KV IDH Lineload', value: 'kano_central_33KV IDH Lineload' },
            { key: 'kc_11kv_21', text: '11KV Airport Road', value: 'kano_central_11KV Airport Road' },
            { key: 'kc_11kv_22', text: '11KV Sabon Gari', value: 'kano_central_11KV Sabon Gari' },
            { key: 'kc_11kv_23', text: '11KV Abuja', value: 'kano_central_11KV Abuja' },
            { key: 'kc_11kv_24', text: '11KV Kaura Goje', value: 'kano_central_11KV Kaura Goje' },
            { key: 'kc_11kv_25', text: '11KV Tudun Murtala', value: 'kano_central_11KV Tudun Murtala' },
            { key: 'kc_11kv_26', text: '11KV Rimin Kebe', value: 'kano_central_11KV Rimin Kebe' },
            { key: 'kc_11kv_27', text: '11KV Kabuga(22%)', value: 'kano_central_11KV Kabuga(22%)' }
        ],
        kano_north: [
            { key: 'kn_33kv_1', text: '33KV BUK Lineload', value: 'kano_north_33KV BUK Lineload' },
            { key: 'kn_11kv_2', text: '11KV Aminu Kano', value: 'kano_north_11KV Aminu Kano' },
            { key: 'kn_11kv_3', text: '11KV Jakara', value: 'kano_north_11KV Jakara' },
            { key: 'kn_11kv_4', text: '11KV Sani Mainagge', value: 'kano_north_11KV Sani Mainagge' },
            { key: 'kn_11kv_5', text: '11KV Bello Dandago', value: 'kano_north_11KV Bello Dandago' },
            { key: 'kn_33kv_6', text: '33KV Kurna Lineload', value: 'kano_north_33KV Kurna Lineload' },
            { key: 'kn_11kv_7', text: '11KV Fed.Sec', value: 'kano_north_11KV Fed.Sec' },
            { key: 'kn_11kv_8', text: '11KV Bachirawa', value: 'kano_north_11KV Bachirawa' },
            { key: 'kn_11kv_9', text: '11KV Orthorpaedic', value: 'kano_north_11KV Orthorpaedic' },
            { key: 'kn_11kv_10', text: '11KV Fanisau', value: 'kano_north_11KV Fanisau' },
            { key: 'kn_11kv_11', text: '11KV Sagagi', value: 'kano_north_11KV Sagagi' },
            { key: 'kn_33kv_12', text: '33KV Dawanau', value: 'kano_north_33KV Dawanau' },
            { key: 'kn_11kv_13', text: '11KV Ibrahim Taiwo', value: 'kano_north_11KV Ibrahim Taiwo' },
            { key: 'kn_11kv_14', text: '11KV City', value: 'kano_north_11KV City' },
        ],
        kano_east: [
            { key: 'ke_11kv_1', text: '11KV Yankaba', value: 'kano_east_11KV Yankaba' },
            { key: 'ke_11kv_2', text: '11KV Dakata', value: 'kano_east_11KV Dakata' },
            { key: 'ke_33kv_3', text: '33KV Gaskiya Lineload', value: 'kano_east_33KV Gaskiya Lineload' },
            { key: 'ke_11kv_4', text: '11KV Tokarawa', value: 'kano_east_11KV Tokarawa' },
            { key: 'ke_11kv_5', text: '11KV Tsamiya', value: 'kano_east_11KV Tsamiya' },
        ],
        kano_industrial: [
            { key: 'ki_11kv_1', text: '11KV Ajasa', value: 'kano_industrial_11KV Ajasa' },
            { key: 'ki_33kv_2', text: '33KV Zaria Road Lineload', value: 'kano_industrial_33KV Zaria Road Lineload' },
            { key: 'ki_11kv_3', text: '11KV Hausawa', value: 'kano_industrial_11KV Hausawa' },
            { key: 'ki_11kv_4', text: '11KV Karkasara', value: 'kano_industrial_11KV Karkasara' },
            { key: 'ki_11kv_5', text: '11KV Marhaba', value: 'kano_industrial_11KV Marhaba' },
        ],
        kano_west: [
            { key: 'kw_33kv_1', text: '33KV Falgore', value: 'kano_west_33KV Falgore' },
            { key: 'kw_33kv_2', text: '33KV K/Kwaso', value: 'kano_west_33KV K/Kwaso' },
            { key: 'kw_33kv_3', text: '33KV Karaye', value: 'kano_west_33KV Karaye' },
            { key: 'kw_11kv_4', text: '11KV Campus', value: 'kano_west_11KV Campus' },
            { key: 'kw_11kv_5', text: '11KV Tiga', value: 'kano_west_11KV Tiga' },
        ]
    },
    katsina: {
        // Feeders for Katsina
    },
    jigawa: {
        // Feeders for Jigawa
    },
    // Add more feeders for other states and districts
};

export const TechnicalForms = ({ className }: TechnicalFormsProps) => {
    const [selectedRadio1, setSelectedRadio1] = useState<string>();

    const handleChange1 = (value: string) => setSelectedRadio1(value);
    const [selectedRadio, setSelectedRadio] = useState<string>();

    const handleChange = (value: string) => setSelectedRadio(value);

    const [faultReports, setFaultReports] = useState([{ occurrenceTime: '', resolveTime: '' }]);

    const handleAddFaultReport = () => {
        setFaultReports([...faultReports, { occurrenceTime: '', resolveTime: '' }]);
    };

    const handleOccurrenceTimeChange = (index: number, value: string) => {
        const updatedFaultReports = [...faultReports];
        updatedFaultReports[index].occurrenceTime = value;
        setFaultReports(updatedFaultReports);
    };

    const handleResolveTimeChange = (index: number, value: string) => {
        const updatedFaultReports = [...faultReports];
        updatedFaultReports[index].resolveTime = value;
        setFaultReports(updatedFaultReports);
    };
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');

    const handleStateChange = (event: any, data: any) => {
        setSelectedState(data.value);
        setSelectedDistrict(''); // Reset selected district when state changes
    };

    const handleDistrictChange = (event: any, data: any) => {
        setSelectedDistrict(data.value);
    };

    useEffect(() => {
        setSelectedDate(''); // Reset selected date when state or district changes
    }, [selectedState, selectedDistrict]);

    return (
        <div className={classNames(styles.root, className)}>
            <Form className={styles.form}>
                <Form.Group widths="equal" className={styles.selection}>
                    <Form.Select
                        fluid
                        label="STATE"
                        options={states}
                        placeholder="STATE"
                        value={selectedState}
                        onChange={handleStateChange}
                    />
                    <Form.Select
                        fluid
                        label="Business District"
                        options={selectedState ? businessDistricts[selectedState] : []}
                        placeholder="Business District"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        disabled={!selectedState}
                    />
                    <Form.Select
                        fluid
                        label="Feeders"
                        options={
                            selectedState && selectedDistrict
                                ? feeders[selectedState][selectedDistrict]
                                : []
                        }
                        placeholder="Feeders"
                        disabled={!selectedState || !selectedDistrict}
                    />
                    <Form.Field>
                        <label>Date</label>
                        <Form.Input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            placeholder="Select Date"
                        />
                    </Form.Field>
                </Form.Group>
                <div className={styles['Hourly-box']}>
                    <h5 className={styles['load-reading-header']}>Hourly Load Reading</h5>
                    <div className={classNames(styles.hourlyforms, styles.am)}>
                        <Form.Group className={styles.selection}>
                            <Form.Input
                                label=""
                                placeholder="00:00"
                                className={styles['hourly-input']}
                                type="text" // Set type to "text"
                            />
                            <Form.Input
                                label=""
                                placeholder="01:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="02:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="03:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="04:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="05:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="06:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="07:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="08:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="09:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="10:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="11:00"
                                className={styles['hourly-input']}
                            />
                        </Form.Group>
                    </div>
                    <div className={classNames(styles.hourlyforms, styles.pm)}>
                        <Form.Group className={styles.selection}>
                            <Form.Input
                                label=""
                                placeholder="12:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="13:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="14:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="15:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="16:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="17:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="18:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="19:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="20:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="21:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="22:00"
                                className={styles['hourly-input']}
                            />
                            <Form.Input
                                label=""
                                placeholder="23:00"
                                className={styles['hourly-input']}
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className={styles.faults}>
                    <div className={styles['header-fault']}>
                        <h5
                            className={classNames(
                                styles['load-reading-header'],
                                styles.interruptions,
                            )}
                        >
                            Interruptions & Fault Reporting
                        </h5>
                    </div>
                    {faultReports.map((fault, index) => (
                        <Fragment key={index}>
                            {' '}
                            {/* Wrap the JSX within Fragment */}
                            <Form.Group className={styles['faults-select']}>
                                <Form.Select
                                    label=""
                                    placeholder="Type of Fault"
                                    options={faultOptions}
                                    className={styles['faults-dropdown']}
                                />
                                <Form.Field className={styles['faults-time-picker']}>
                                    <label></label>
                                    <Form.Input
                                        type="time"
                                        value={fault.occurrenceTime}
                                        onChange={(e) =>
                                            handleOccurrenceTimeChange(index, e.target.value)
                                        }
                                        placeholder="Time of Occurrence"
                                        label="Time Occurred:"
                                        inline
                                    />
                                </Form.Field>
                                <Form.Field className={styles['faults-time-picker']}>
                                    <label></label>
                                    <Form.Input
                                        type="time"
                                        value={fault.resolveTime}
                                        onChange={(e) =>
                                            handleResolveTimeChange(index, e.target.value)
                                        }
                                        placeholder="Time of Resolve"
                                        label="Time Resolved:"
                                        inline
                                    />
                                </Form.Field>
                            </Form.Group>
                        </Fragment>
                    ))}
                    <button className={styles['add-fault']} onClick={handleAddFaultReport}>
                        +{' '}
                    </button>
                </div>
                <div className={styles['energy-reading']}>
                    <h5 className={styles['load-reading-header']}>Energy Reading</h5>

                    <Form.Input label="" placeholder="Energy Reading" type="number" />
                </div>
                <div className={styles['save-submit']}>
                    <button className={styles['save-button']}>Save Changes</button>
                    <button className={styles['submit-button']} type="submit">
                        {' '}
                        Submit
                    </button>
                </div>
            </Form>
        </div>
    );
};