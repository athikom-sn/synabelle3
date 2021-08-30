;SetTitleMatchMode, 2
wintitle = ragnarok
;SetTitleMatchMode, 2
;ControlSend,,{Enter}, %wintitle%
; ControlSend,,{Enter},%wintitle%

CoordMode Pixel Screen
CoordMode Mouse Screen
; SetTitleMatchMode 1

; Send {Enter}
ControlSend,,{Enter}, %wintitle%

return

; ControlSend,,{Enter}, "Pangya Executable"

; WinGetPos ,, , Width, Height, A
; mousemove , (1024/2), (858/2)

; Return

; MouseMove, 100, 100
; DllCall("SetCursorPos", "int", 1024, "int", 858)
; SendEvent {MouseMove 1024 858}

; SetTitleMatchMode, 2
; #IfWinActive, Full or Partial Name of Window
; 2::
; MouseGetPos, LocX, LocY
; MouseClick, 850, 600
; MouseMove, %LocX%, %LocY%
; Return

; #SingleInstance force
; CoordMode, Mouse, Relative
; SetTitleMatchMode 2
; SetTimer MMT, 2000

; LastActiveWin =
; Return

; MMT:
; WinID := WinExist("Pangya Fresh Up!")
; IfEqual WinID, %LastActiveWin%
;    return
; LastActiveWin = %WinID%
; WinGetActiveStats, AWTitle, AWWidth, AWHeight, AWX, AWY
; MPosX := (AWWidth//2)
; MPosY := (AWHeight//2)
; MouseMove, %MPosX%, %MPosY%
; Return