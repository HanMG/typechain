# 설치 
npm i -D typescript

# typescript config
tsconfig.json 생성 및 해당 파일에 세팅

# index.ts 생성 후 
npx tsc로 컴파일을 통해 index파일 및 map파일 생성
global로 설치시 그냥 tsc 해도 됨

# tsc-watch : watch모드로 변화 반영
1. npm i -D tsc-watch 
2. dist, src 생성, src 밑으로 index.ts 이동
2. tsconfig 수정 "include": ["src/**/*"] src 밑의 모든 파일을 컴파일
3. package.json에서 start": "tsc-watch --onSuccess \" node dist/index.js\" " 로 수정    
== onSuccess이면 뒤가 실행

# type 적용
변수 : types
타입을 정해줘서 예측하기 쉽게 도움

# Object type 적용
TS에서만 사용가능한 interface로 적용가능.
JS에서는 interface가 컴파일 되지 않음 
interface 인터페이스명 {
    변수1: types
    변수2: types
}

Class 형태로도 가능하고 변수에 접근지정자(public, private, etc)를 사용가능

React, express, node등에서는 Class 형태로 사용해야한다함
Class 클래스명 {
    public 변수1: types;
    public 변수2: types;
    constructor (변수1: types, 변수2: types){
        this.변수1 = 변수1;
        this.변수2 = 변수2;
    }
}







