import { Vue, Component } from 'vue-property-decorator';

@Component
export default class MixinValidation extends Vue {
    idRules: any = [
        (v: any) => !!v || '아이디는 필수 입니다.',
        (v: any) =>
            (v && v.length <= 20) || '아이디는 20자 이내로 입력해주세요.',
    ];
    nameRules: any = [
        (v: any) => !!v || '이름은 필수 입니다.',
        (v: any) => (v && v.length <= 20) || '이름은 20자 이내로 입력해주세요.',
    ];
    emailRules: any = [
        (v: any) => /.+@.+\..+/.test(v) || '이메일 형식에 맞지 않습니다.',
    ];
    addressRules: any = [
        (v: any) =>
            (v && v.length <= 200) || '주소는 200자 이내로 입력해주세요.',
    ];
}
