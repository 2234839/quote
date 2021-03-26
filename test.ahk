
; loop
; {
;     Input, retrieved, V, {space}
;     RegExMatch(retrieved,"[.+]{6}", match)
;     RegExMatch(match,"\d", output)
;     If (output !="")
;     Sendinput, ==%retrieved%==
; }

; ::btw:: 3
; Return
^j::
{
;    MsgBox % WinExist("A")

    WinMove, A ,, 74, 81
    ; WinMaximize, A ;最大化活动窗口

    ; ControlGetFocus, Edit, A
    ; if ErrorLevel
    ; {
    ;     MsgBox, 没有找到被 focus 的输入框.
    ; }
    ; Else{

    ;     ControlGetText, OutputVar , %Edit% , A
    ;     if ErrorLevel
    ;     {
    ;         MsgBox, 获取 %ExistWindows% 文本失败
    ;     }
    ;     MsgBox, %OutputVar%
    ; }

}
^r::
    Reload