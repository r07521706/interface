import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Icon,
  Input,
  Popover,
  Row,
  Select,
  TimePicker,
  Checkbox,
  Rate,
  Upload,
  Slider,
  Radio,
  Switch,
  InputNumber,
  Select
} from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import TableForm from './components/TableForm';
import FooterToolbar from './components/FooterToolbar';
import styles from './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Meta } = Card;
const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

interface AdvancedFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  submitting: boolean;
}

@connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['formAdvancedForm/submitAdvancedForm'],
}))
class AdvancedForm extends Component<AdvancedFormProps> {
  state = {
    width: '100%',
    product:[]
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  getErrorInfo = () => {
    const {
      form: { getFieldsError },
    } = this.props;
    const errors = getFieldsError();
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      const errorMessage = errors[key] || [];
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <Icon type="cross-circle-o" className={styles.errorIcon} />
          <div className={styles.errorMessage}>{errorMessage[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0] as HTMLDivElement;
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };
  handleSubmit = e => {
    console.log('hi');
    const {
      dispatch,
    } = this.props;
    e.preventDefault();
    let username;
    let url;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        username = values.username;
        url = values.url;
        dispatch({
          type: 'ProductList/addProduct',
          payload: values,
        });
      }
    });
    //{username:values.username,url:values.url}
    // console.log(this.state)

    this.state.product.push({username,url});

  };
  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        console.log(values);
        dispatch({
          type: 'formAdvancedForm/submitAdvancedForm',
          payload: values,
        });
      }
    });
  };

  render() {
    // const { getFieldDecorator } = this.props.form;
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;
    const { width } = this.state;
    const { product } = this.state;
    // console.log(product);
    return (
      <>
        <PageHeaderWrapper content="內容">

          <Card title="資料登入" className={styles.card} bordered={false}>
            <Form onSubmit={this.handleSubmit}>
            <Form.Item >
              {getFieldDecorator('username', {
                initialValue:"Ari",
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>

            <Form.Item >
              {getFieldDecorator('url', {
                rules: [{ required: true, message: 'Please input your username!' }],
                initialValue:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
              })(
                <Input

                  prefix={<Icon type="twitter" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="url"

                />
              )}
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit">
                  Submit
              </Button>
            </Form.Item>
            </Form>


          </Card>


          <Card  title="商品" className={styles.card} bordered={false}>
             <Row gutter={16}>
              {product.map(single_product=>
                <Col span={8}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={single_product.url}/>}
                  className={styles.card}
                  >
                  <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
                </Col>
              )}
              </Row>
          </Card>

        </PageHeaderWrapper>

      </>
    );
  }
}

export default Form.create<AdvancedFormProps>()(AdvancedForm);
