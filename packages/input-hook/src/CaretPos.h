#pragma once
#include <WinUser.h>
#include <windef.h>
#include <windows.h>
#include <iostream>
class CaretPos
{
public: void  getPosition() {
	GUITHREADINFO pg;
	pg.cbSize = sizeof(GUITHREADINFO);
	POINT point; //π‚±ÍŒª÷√
	::GetGUIThreadInfo(NULL, &pg);
	RECT rc;
	rc.left = pg.rcCaret.left;
	rc.top = pg.rcCaret.top;
	rc.right = pg.rcCaret.right;
	rc.bottom = pg.rcCaret.bottom;


	int len = ::GetWindowTextLength(pg.hwndFocus);
	char windowTitle[65536];           /* An EDIT control's limit */
	::GetWindowText(pg.hwndFocus, windowTitle, len+1);

	std::cout << "hwnd:" << pg.hwndFocus << "  Title:" << windowTitle << std::endl;


	std::cout << "rc-pos   " << rc.top << " | " << rc.right << rc.right << " | " << rc.bottom << " | " << rc.left << std::endl;

}
};

//void CaretPos::getPosition() {
//
//}

