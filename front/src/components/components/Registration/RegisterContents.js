import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import RegisterInput from './RegisterInput';
import { StyledButton } from '../Styled';
import { SIGN_UP_REQUEST } from '../../../reducers/user';
import registerCheck from '../../data/registerCheck';

export default function RegisterContents(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [company, setCompany] = useState({
    email: '',
    password: '',
    name: '',
    contact: '',
    companyName: '',
    homepage: '',
    registrationNumber: '',
    role: 'ROLE_COMPANY',
  });

  const [check, setCheck] = useState({
    email: 0,
    password: 0,
    confirmPassword: '',
    confirmBoolean: 0,
    name: 0,
    contact: 0,
    companyName: 0,
    homepage: 0,
    registrationNumber: 0,
  });

  const companyChange = (e) => {
    if (e.target.name === 'checkPassword') {
      setCheck((prev) => ({
        ...prev,
        confirmPassword: e.target.value,
        confirmBoolean: registerCheck(company, check)['repeatPassword']
          ? 1
          : -1,
      }));
    } else {
      setCompany((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
      setCheck((prev) => ({
        ...prev,
        [e.target.name]: registerCheck(company, check)[e.target.name] ? 1 : -1,
      }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      check.email *
        check.password *
        check.confirmBoolean *
        check.name *
        check.companyName *
        check.homepage *
        check.registrationNumber *
        check.contact >
      0
    ) {
      dispatch({
        type: SIGN_UP_REQUEST,
        data: company,
      });
    }
  };

  const autoHyphen = (com, input) => {
    const str = com.contact;
    let tmp = '';

    if (str.substring(0, 2) === '02') {
      if (str.length === 2) {
        tmp = str + '-';
        input((prev) => {
          return {
            ...prev,
            contact: tmp,
          };
        });
      } else if (str.length === 6) {
        tmp = str + '-';
        input((prev) => {
          return {
            ...prev,
            contact: tmp,
          };
        });
      } else if (str.length === 12 && str[7] !== '-') {
        tmp = str.substring(0, 6) + str[7] + '-' + str.substring(8, 12);
        input((prev) => {
          return {
            ...prev,
            contact: tmp,
          };
        });
      }
    } else if (str.substring(0, 2) !== '02') {
      if (str.length === 3) {
        tmp = str + '-';
        input((prev) => {
          return {
            ...prev,
            contact: tmp,
          };
        });
      } else if (str.length === 7) {
        tmp += str + '-';
        input((prev) => {
          return {
            ...prev,
            contact: tmp,
          };
        });
      } else if (str.length === 13 && str[8] !== '-') {
        tmp += str.substring(0, 7) + str[8] + '-' + str.substring(9);
        input((prev) => {
          return {
            ...prev,
            contact: tmp,
          };
        });
      }
    }
  };

  useEffect(() => autoHyphen(company, setCompany), [company]);
  useEffect(() => {
    const str = company.registrationNumber;
    let tmp = '';

    if (str.length === 3) {
      tmp += str;
      tmp += '-';
      setCompany((prev) => {
        return {
          ...prev,
          registrationNumber: tmp,
        };
      });
    } else if (str.length === 6) {
      tmp += str;
      tmp += '-';
      setCompany((prev) => {
        return {
          ...prev,
          registrationNumber: tmp,
        };
      });
    }
  }, [company.registrationNumber]);

  useEffect(() => {
    if (user.signUpDone) {
      history.goBack();
    }
  }, [user, history]);

  return (
    <>
      <div className="container">
        <h3 style={{ marginBottom: '15px' }}>기업 회원가입</h3>
        <RegisterInput
          name="email"
          id="회사 이메일"
          type="text"
          test={check.email}
          onChange={(e) => companyChange(e)}
        />
        <RegisterInput
          name="password"
          id="비밀번호"
          type="password"
          maxLength="20"
          test={check.password}
          onChange={(e) => companyChange(e)}
        />
        <RegisterInput
          name="checkPassword"
          id="비밀번호 확인"
          type="password"
          maxLength="20"
          test={check.confirmBoolean}
          onChange={(e) => companyChange(e)}
        />
        <h5 style={{ marginTop: '20px' }}>기업 정보</h5>
        <RegisterInput
          name="companyName"
          id="기업명"
          type="text"
          test={check.companyName}
          onChange={(e) => companyChange(e)}
        />
        <RegisterInput
          name="homepage"
          id="기업 홈페이지"
          type="text"
          test={check.homepage}
          onChange={(e) => companyChange(e)}
        />
        <RegisterInput
          name="registrationNumber"
          id="사업자 등록번호"
          type="text"
          maxLength="12"
          value={company.registrationNumber}
          test={check.registrationNumber}
          onChange={(e) => companyChange(e)}
        />
        <RegisterInput
          name="name"
          id="담당자 이름"
          type="text"
          test={check.name}
          onChange={(e) => companyChange(e)}
        />
        <RegisterInput
          name="contact"
          id="담당자 연락처"
          type="text"
          maxLength="13"
          value={company.contact}
          test={check.contact}
          onChange={(e) => companyChange(e)}
        />
        <div>
          <StyledButton
            style={{ width: '100%', margin: '15px 0 30px 0' }}
            onClick={(e) => submitHandler(e)}
          >
            회원가입
          </StyledButton>
        </div>
      </div>
    </>
  );
}
