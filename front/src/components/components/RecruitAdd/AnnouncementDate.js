import React from 'react';
import { DataInputs } from '../Styled';

export default function AnnouncementDate() {
  return (
    <>
      <div
        style={{
          marginBottom: '30px',
        }}
      >
        <span
          style={{
            display: 'inline-block',
          }}
        >
          <div
            style={{
              marginBottom: '5px',
            }}
          >
            공고시작일자
          </div>
          <DataInputs type="text" />
        </span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span
          style={{
            display: 'inline-block',
          }}
        >
          <div
            style={{
              marginBottom: '5px',
            }}
          >
            공고마감일자
          </div>
          <DataInputs type="text" />
        </span>
      </div>
    </>
  );
}
