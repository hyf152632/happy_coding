import PropTypes from 'prop-types';
import { Popover, Row, Col } from 'antd';
// @ts-ignore
import styles from './index.less';

import PrintSettingStrItem from './PrintSettingStrItem';
import PrintSettingBoolItem from './PrintSettingBoolItem';
import PrintSettingNumItem from './PrintSettingNumItem';
import PrintSettingEnumItem from './PrintSettingEnumItem';
import PrintSettingPolygonItem from './PrintSettingPolygonItem';
import PrintSettingExtruderItem from './PrintSettingExtruderItem';
import PrintSettingIntArrItem from './PrintSettingIntArrItem';
import PrintSettingOptExtItem from './PrintSettingOptExtItem';

function PrintSettingItem(props) {
  const {
    itemData,
    itemData: { type = '', label = '', description = '', children = null } = {},
  } = props;

  const cond = {
    str: () => <PrintSettingStrItem itemData={itemData} />,
    bool: () => <PrintSettingBoolItem itemData={itemData} />,
    float: () => <PrintSettingNumItem itemData={itemData} />,
    int: () => <PrintSettingNumItem itemData={itemData} />,
    enum: () => <PrintSettingEnumItem itemData={itemData} />,
    polygon: () => <PrintSettingPolygonItem itemData={itemData} />,
    polygons: () => <PrintSettingPolygonItem itemData={itemData} />,
    extruder: () => <PrintSettingExtruderItem itemData={itemData} />,
    '[int]': () => <PrintSettingIntArrItem itemData={itemData} />,
    optional_extruder: () => <PrintSettingOptExtItem itemData={itemData} />,
  };

  if (!cond.hasOwnProperty(type)) {
    console.error(
      `================ print setting item has unknown type: ${type} ==================`,
    );
    return null;
  }
  return (
    <>
      <Popover
        mouseEnterDelay={0.5}
        overlayClassName="printsetting_setting_param_popover_custom"
        overlayStyle={{ maxWidth: '220px' }}
        placement="leftTop"
        autoAdjustOverflow
        title={label}
        content={description}
        align={{
          offset: [-35, 0],
        }}
      >
        <div className={styles.wrapper}>
          <div className={styles.item_wrapper}>
            <Row justify="space-between" align="middle" className={styles.item_row}>
              <Col span={12} title={label} className={styles.item_label}>
                {label}
              </Col>
              <Col span={12} className={styles.item_type}>
                {cond[type]()}
              </Col>
            </Row>
          </div>
        </div>
      </Popover>
      {children &&
        Object.keys(children).length &&
        Object.keys(children).map(i => (
          <div className={styles.child_wrapper} key={i}>
            <PrintSettingItem itemData={children[i]} />
          </div>
        ))}
    </>
  );
}

PrintSettingItem.defaultProps = {
  itemData: {
    label: '',
    description: '',
    type: '', // 'str' | 'float' | 'enum' | 'int' | 'polygons' | 'polygon' | 'extruder' | '[int]' | 'optional_extruder'
    default_value: '',
    settable_per_mesh: false,
    settable_per_extruder: false,
    settable_per_meshgroup: false,
    enabled: false,

    // type: 'float' | 'int'
    unit: 'mm',
    minimum_value: '0.00001',
    maximum_value: '',
    minimum_value_warning: '0.4',
    maximum_value_warning: '3.5',
    // type: 'enum'
    options: {},
    children: null,
  },
};

PrintSettingItem.propTypes = {
  itemData: PropTypes.object,
};

export default PrintSettingItem;
